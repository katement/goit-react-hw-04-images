import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

import Modal from './Modal/Modal';
import { fetchData } from './services/api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const [showLoadMore, setShowLoadMore] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [visibleData, setVisibleData] = useState(null);

  useEffect(() => {
    const fetchPosts = async (query, page) => {
      try {
        setIsLoading(true);
        const response = await fetchData(query, page);
        const newPosts = response.hits;
        if (newPosts.length > 12) setShowLoadMore(true);
        if (newPosts.length === 0) {
          setPosts([]);
          return;
        }
        if (page === 1) {
          setPosts(newPosts);
        } else {
          setPosts(prevPosts => [...prevPosts, newPosts]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length === 0 && page === 1) return;
    fetchPosts(query, page);
  }, [query, page]);

  const handleSubmit = searchQuery => {
  
    const newQuery = searchQuery;
    if (newQuery.trim().length === 0) {
      return toast.info('Please, enter your search query firstly');
    }
    if (query !== newQuery) {
      setQuery(newQuery);
      setPage(1);
    }
  };

  const incrementPage = () => {
    // loadMore();
    setPage(prevPage => prevPage + 1);
  };

  // const loadMore = async () => {
  //   try {
  //     setIsLoading(true);
  //     const posts = await fetchData(query, page);

  //     setPosts(prevPosts => [...prevPosts, ...posts.hits]);
  //     setShowLoadMore(posts.totalHits / page > 12);
  //   } catch (error) {
  //     toast.error(`Oops, some error occured ${error.message}`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const onOpenModal = data => {
    setIsOpen(true);

    setVisibleData(data);
  };
  const onCloseModal = () => {
    setIsOpen(false);
    setVisibleData(null);
  };

  return (
    <div>
      {error && <p>{error.message}</p>}
      {isOpen && (
        <Modal visibleData={visibleData} onCloseModal={onCloseModal} />
      )}
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={posts} onOpenModal={onOpenModal} />

      {posts.length % 12 === 0 && posts.length >= 12 && (
        <Button onClick={incrementPage} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
export default App;
