import React, { useState, useEffect } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import { IoMdHeartEmpty, IoIosHeart } from 'react-icons/io';

const LIKE_QUIZ_MUTATION = gql`
	mutation toggleLikeQuiz($quizId: String!) {
		toggleLikeQuiz(quizId: $quizId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

const LikeButton = ({ quiz: { likes, id, likeCount }, user }) => {
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [user, likes]);

	const [toggleLikeQuiz] = useMutation(LIKE_QUIZ_MUTATION, {
		onError(err) {
			return err;
		},
		variables: { quizId: id },
	});

	return (
		<>
			<Box
				as='button'
				role='group'
				display='flex'
				alignItems='center'
				marginX='16px'
				color={isLiked ? 'red.500' : 'gray.500'}
				onClick={toggleLikeQuiz}
				_hover={{ color: 'red.500' }}
				_focus={{ outline: 'none' }}
			>
				<IconButton
					variant='outline'
					colorScheme='gray'
					aria-label='Like post'
					isRound
					_focus={{ outline: 'none' }}
					border='none'
					_groupHover={{ bg: 'red.100', color: 'red.500' }}
					fontSize='24px'
					icon={isLiked ? <IoIosHeart /> : <IoMdHeartEmpty />}
				/>
				{likeCount && (
					<Text fontFamily='inter' color='inherit' marginLeft='8px'>
						{likeCount}
					</Text>
				)}
			</Box>
		</>
	);
};

export default LikeButton;
