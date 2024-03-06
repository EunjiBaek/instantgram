'use client';

import { Comment, SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import ActionBar from './ActionBar';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import PostUserAvatar from './PostUserAvatar';
import ModalPortal from './ui/ModalPortal';
import usePosts from '@/hooks/posts';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text} = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  }

  return (
    <article className='border border-gray-200 rounded-lg shadow-md'>
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className='object-cover w-full aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className='mr-1 font-bold'>{username}</span>
          {text}
        </p>
        {comments > 1 && 
          <button className='my-2 font-bold text-sky-700' onClick={() => setOpenModal(true)}>{`View all ${comments} comments`}</button>
        }
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
