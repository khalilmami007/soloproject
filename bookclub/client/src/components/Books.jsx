import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
  });

  const [books, setBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchBooks();
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchCurrentUser(token);
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/book', newBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchBooks();

      if (currentUser) {
        const updatedUser = await axios.patch(
          'http://localhost:5000/api/updateFavorites',
          {
            bookId: response.data.newBook._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCurrentUser(updatedUser.data);
      }

      setNewBook({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating book:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleBookClick = (bookId, addedByUserId) => {
    const fullName = `${currentUser.firstname} ${currentUser.lastname}`;
    if (currentUser && fullName === addedByUserId) {
      navigate(`/books/${bookId}`);
    } else {
      navigate(`/favorite/${bookId}`);
    }
  };

  const handleAddFavorite = async (bookId) => {
    try {
      const token = localStorage.getItem('authToken');
  
      // Add the book to favorites
      const response = await axios.post(
        'http://localhost:5000/api/addFavorite',
        {
          bookId: bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check if the book is added to favorites (response.data.favorites is true)
      if (response.data.favorites === true) {
        // Update the current user's favorites
        setCurrentUser((prevUser) => ({
          ...prevUser,
          favorites: true, // Set favorites to true
        }));
      } else {
        // Handle the case when the book is not added to favorites
        console.log('Book could not be added to favorites.');
      }
    } catch (error) {
      console.error('Error adding favorite:', error.message);
    }
  };
  return (
    <div>
      {currentUser && <h2>Welcome, {currentUser.firstname} {currentUser.lastname}!</h2>}

      <h2>Create a New Book</h2>
      <form onSubmit={handleCreateBook}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={newBook.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <br />
        <button type="submit">Create Book</button>
      </form>

      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong>: {book.description}{' '}
            {book.addedBy && <span>(Added by {book.addedBy})</span>}
            <button onClick={() => handleBookClick(book._id, book.addedBy)}>
              View Details
            </button>
            {currentUser && (
              <span>
                {book.favorites ? 'Already in Favorites' : (
                  <button onClick={() => handleAddFavorite(book._id)}>
                    Add to Favorites
                  </button>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>

      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Books;
