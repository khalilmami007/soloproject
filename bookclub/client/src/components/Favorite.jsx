import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Favorite = () => {
  const navigate = useNavigate();
  const { BookId } = useParams();
  const [book, setBook] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/book/${BookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error.message);
        setBook(null); // Set book to null in case of an error
      }
    };

    const token = localStorage.getItem('authToken');
    if (token) {
      fetchBookDetails();
      fetchCurrentUser(token);
    }
  }, [BookId]);

  const fetchCurrentUser = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/currentUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div>
      {currentUser && <h2>Welcome, {currentUser.firstname} {currentUser.lastname}!</h2>}
      
      <h2>Book Details</h2>
      {book ? (
        <div>
          <strong>Title:</strong> {book.title}<br />
          <strong>Description:</strong> {book.description}<br />
          <strong>Added By:</strong> {book.addedBy}<br />
          {book.createdAt && (
            <span>
              <strong>Created On:</strong> {new Date(book.createdAt).toLocaleString()}<br />
            </span>
          )}
          {book.updatedAt && (
            <span>
              <strong>Updated On:</strong> {new Date(book.updatedAt).toLocaleString()}<br />
            </span>
          )}
        </div>
      ) : (
        <p>{book === null ? 'Loading book details...' : 'Error fetching book details.'}</p>
      )}
      <button onClick={() => navigate('/books')}>Back to Books</button>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Favorite;
