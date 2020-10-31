const {
	AuthenticationError,
	UserInputError,
	ExpandAbstractTypes,
} = require('apollo-server');
const Quiz = require('../../models/Quiz');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
	Query: {
		getQuizzes: async () => {
			try {
				const quizzes = await Quiz.find();
				return quizzes;
			} catch (err) {
				throw new Error(err);
			}
		},
		getQuiz: async (parent, { quizId }) => {
			try {
				const quiz = await Quiz.findById(quizId);
				if (quiz) {
					return quiz;
				} else {
					throw new Error('Quiz not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createQuiz: async (parent, { title, description, questions }, context) => {
			const user = checkAuth(context);

			if (description.trim() === '') {
				body = 'There is no description about in this quiz';
			}

			const newQuiz = new Quiz({
				title,
				description,
				author: user.id,
				questions: [...questions],
				createdAt: new Date().toISOString(),
			});
			await newQuiz.save();

			return newQuiz;
		},
		deleteQuiz: async (parent, { quizId }, context) => {
			const user = checkAuth(context);
			try {
				const quiz = await Quiz.findById(quizId);
				if (!quiz) {
					throw new Error('Quiz not found');
				}
				if (user.id == quiz.author) {
					await quiz.delete();
					return 'Quiz deleted successfully';
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		addQuestion: async (parent, { quizId, questions }, context) => {
			const user = checkAuth(context);
			try {
				const quiz = await Quiz.findById(quizId);

				if (!quiz) {
					throw new Error('Quiz not found');
				}

				if (user.id == quiz.author) {
					quiz.questions.push(...questions);
					await quiz.save();
					return quiz;
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteQuestion: async (parent, { quizId, questionId }, context) => {
			const user = checkAuth(context);
			try {
				const quiz = await Quiz.findById(quizId);

				if (!quiz) {
					throw new Error('Quiz not found');
				}

				const question = quiz.questions.find(
					(question) => question.id === questionId
				);
				if (!question) {
					throw new Error('Question not found');
				}

				if (quiz.author.toString() !== user.id.toString()) {
					throw new AuthenticationError('Action not allowed');
				}
				await question.remove();
				await quiz.save();

				return 'Question deleted successfully';
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};