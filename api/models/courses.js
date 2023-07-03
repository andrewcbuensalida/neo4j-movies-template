const _ = require("lodash");
const dbUtils = require("../neo4j/dbUtils");
const Movie = require("./neo4j/movie");
const Course = require("./neo4j/course");
const Person = require("./neo4j/person");
const Genre = require("./neo4j/genre");

const _singleMovieWithDetails = function (record) {
	if (record.length) {
		const result = {};
		_.extend(
			result,
			new Movie(record.get("movie"), record.get("my_rating"))
		);

		result.directors = _.map(record.get("directors"), (record) => {
			return new Person(record);
		});
		result.genres = _.map(record.get("genres"), (record) => {
			return new Genre(record);
		});
		result.producers = _.map(record.get("producers"), (record) => {
			return new Person(record);
		});
		result.writers = _.map(record.get("writers"), (record) => {
			return new Person(record);
		});
		result.actors = _.map(record.get("actors"), (record) => {
			return record;
		});
		result.related = _.map(record.get("related"), (record) => {
			return new Movie(record);
		});
		return result;
	} else {
		return null;
	}
};

/**
 *  Query Functions
 */

const _getByWriter = function (params, options, callback) {
	const cypher_params = {
		id: params.id,
	};

	const query = [
		"MATCH (:Person {tmdbId: $id})-[:WRITER_OF]->(movie:Movie)",
		"RETURN DISTINCT movie",
	].join("\n");

	callback(null, query, cypher_params);
};

function manyCourses(neo4jResult) {
	// console.log(`This is neo4jResult: `, neo4jResult);
//   Example neo4jResult:  {
//   records: [
//     Record {
//       keys: [Array],
//       length: 1,
//       _fields: [Array],
//       _fieldLookup: [Object]
//     },
//   ],
//   summary: ResultSummary {
//     query: { text: 'MATCH (course:Course) RETURN course', parameters: {} },     
//     queryType: 'r',
//     counters: QueryStatistics { _stats: [Object], _systemUpdates: 0 },
//     updateStatistics: QueryStatistics { _stats: [Object], _systemUpdates: 0 },  
//     plan: false,
//     profile: false,
//     notifications: [],
//     server: ServerInfo {
//       address: 'f6315e58.databases.neo4j.io:7687',
//       version: 'Neo4j/5.9-aura',
//       protocolVersion: undefined
//     },
//     resultConsumedAfter: Integer { low: 4, high: 0 },
//     resultAvailableAfter: Integer { low: 2, high: 0 },
//     database: { name: 'neo4j' }
//   }
// }
	return neo4jResult.records.map((r) => {
    // Example r:  Record {
    //   keys: [ 'course' ],
    //   length: 1,
    //   _fields: [
    //     Node { identity: [Integer], labels: [Array], properties: [Object] }
    //   ],
    //   _fieldLookup: { course: 0 }
    // }
		const course = new Course(r.get("course"));
    // Example course:  {
    //   identifier: 'PL4LFuHwItvKbdK-ogNsOx2X58hHGeQm8c',
    //   teacher: 'Gavin Lon',
    //   title: 'Blazor Shopping Cart Application'
    // }
		// console.log(`This is course: `, course);
		return course;
	});
}

// get all courses
const getAll = function (session) {
	const courses = session
		.readTransaction((txc) =>
			txc.run("MATCH (course:Course) RETURN course")
		)
		.then((r) => manyCourses(r));
	return courses;
};

// get a single movie by id
const getById = function (session, movieId, userId) {
	const query = [
		"MATCH (movie:Movie {tmdbId: $movieId})",
		"OPTIONAL MATCH (movie)<-[my_rated:RATED]-(me:User {id: $userId})",
		"OPTIONAL MATCH (movie)<-[r:ACTED_IN]-(a:Person)",
		"OPTIONAL MATCH (related:Movie)<--(a:Person) WHERE related <> movie",
		"OPTIONAL MATCH (movie)-[:IN_GENRE]->(genre:Genre)",
		"OPTIONAL MATCH (movie)<-[:DIRECTED]-(d:Person)",
		"OPTIONAL MATCH (movie)<-[:PRODUCED]-(p:Person)",
		"OPTIONAL MATCH (movie)<-[:WRITER_OF]-(w:Person)",
		"WITH DISTINCT movie,",
		"my_rated,",
		"genre, d, p, w, a, r, related, count(related) AS countRelated",
		"ORDER BY countRelated DESC",
		"RETURN DISTINCT movie,",
		"my_rated.rating AS my_rating,",
		"collect(DISTINCT d) AS directors,",
		"collect(DISTINCT p) AS producers,",
		"collect(DISTINCT w) AS writers,",
		"collect(DISTINCT{ name:a.name, id:a.tmdbId, poster_image:a.poster, role:r.role}) AS actors,",
		"collect(DISTINCT related) AS related,",
		"collect(DISTINCT genre) AS genres",
	].join("\n");

	return session
		.readTransaction((txc) =>
			txc.run(query, {
				movieId: movieId,
				userId: userId,
			})
		)
		.then((result) => {
			if (!_.isEmpty(result.records)) {
				return _singleMovieWithDetails(result.records[0]);
			} else {
				throw { message: "movie not found", status: 404 };
			}
		});
};

// Get by date range
const getByDateRange = function (session, start, end) {
	const query = [
		"MATCH (movie:Movie)",
		"WHERE movie.released > $start AND movie.released < $end",
		"RETURN movie",
	].join("\n");

	return session
		.readTransaction((txc) =>
			txc.run(query, {
				start: parseInt(start || 0),
				end: parseInt(end || 0),
			})
		)
		.then((result) => manyCourses(result));
};

// Get by date range
const getByActor = function (session, id) {
	const query = [
		"MATCH (actor:Person {tmdbId: $id})-[:ACTED_IN]->(movie:Movie)",
		"RETURN DISTINCT movie",
	].join("\n");

	return session
		.readTransaction((txc) =>
			txc.run(query, {
				id: id,
			})
		)
		.then((result) => manyCourses(result));
};

// get a movie by genre
const getByGenre = function (session, genreId) {
	const query = [
		"MATCH (movie:Movie)-[:IN_GENRE]->(genre)",
		"WHERE toLower(genre.name) = toLower($genreId) OR id(genre) = toInteger($genreId)", // while transitioning to the sandbox data
		"RETURN movie",
	].join("\n");

	return session
		.readTransaction((txc) =>
			txc.run(query, {
				genreId: genreId,
			})
		)
		.then((result) => manyCourses(result));
};

// Get many movies directed by a person
const getByDirector = function (session, personId) {
	const query = [
		"MATCH (:Person {tmdbId: $personId})-[:DIRECTED]->(movie:Movie)",
		"RETURN DISTINCT movie",
	].join("\n");

	return session
		.readTransaction((txc) =>
			txc.run(query, {
				personId: personId,
			})
		)
		.then((result) => manyCourses(result));
};

// Get many movies written by a person
const getByWriter = function (session, personId) {
	const query = [
		"MATCH (:Person {tmdbId: $personId})-[:WRITER_OF]->(movie:Movie)",
		"RETURN DISTINCT movie",
	].join("\n");

	return session
		.readTransaction((txc) =>
			txc.run(query, {
				personId: personId,
			})
		)
		.then((result) => manyCourses(result));
};

const rate = function (session, movieId, userId, rating) {
	return session.writeTransaction((txc) =>
		txc.run(
			"MATCH (u:User {id: $userId}),(m:Movie {tmdbId: $movieId}) \
      MERGE (u)-[r:RATED]->(m) \
      SET r.rating = $rating \
      RETURN m",
			{
				userId: userId,
				movieId: movieId,
				rating: parseInt(rating),
			}
		)
	);
};

const deleteRating = function (session, movieId, userId) {
	return session.writeTransaction((txc) =>
		txc.run(
			"MATCH (u:User {id: $userId})-[r:RATED]->(m:Movie {tmdbId: $movieId}) DELETE r",
			{ userId: userId, movieId: movieId }
		)
	);
};

const getRatedByUser = function (session, userId) {
	return session
		.readTransaction((txc) =>
			txc.run(
				"MATCH (:User {id: $userId})-[rated:RATED]->(movie:Movie) \
       RETURN DISTINCT movie, rated.rating as my_rating",
				{ userId: userId }
			)
		)
		.then((result) => {
			return result.records.map(
				(r) => new Movie(r.get("movie"), r.get("my_rating"))
			);
		});
};

const getRecommended = function (session, userId) {
	return session
		.readTransaction((txc) =>
			txc.run(
				"MATCH (me:User {id: $userId})-[my:RATED]->(m:Movie) \
      MATCH (other:User)-[their:RATED]->(m) \
      WHERE me <> other \
      AND abs(my.rating - their.rating) < 2 \
      WITH other,m \
      MATCH (other)-[otherRating:RATED]->(movie:Movie) \
      WHERE movie <> m \
      WITH avg(otherRating.rating) AS avgRating, movie \
      RETURN movie \
      ORDER BY avgRating desc \
      LIMIT 25",
				{ userId: userId }
			)
		)
		.then((result) => manyCourses(result));
};

// export exposed functions
module.exports = {
	getAll: getAll,
	getById: getById,
	getByDateRange: getByDateRange,
	getByActor: getByActor,
	getByGenre: getByGenre,
	getMoviesbyDirector: getByDirector,
	getMoviesByWriter: getByWriter,
	rate: rate,
	deleteRating: deleteRating,
	getRatedByUser: getRatedByUser,
	getRecommended: getRecommended,
};
