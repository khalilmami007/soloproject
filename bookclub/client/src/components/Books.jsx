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

  useEffect(() => {
    // Fetch books when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');

      // Include the token in the headers of the axios POST request
      await axios.post('http://localhost:5000/api/book', newBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refetch books after creating a new one
      fetchBooks();

      // Clear the form by resetting the state
      setNewBook({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating book:', error.message);
      // Handle error (show error message or redirect)
    }
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('authToken');

    // Redirect to the home page or login page
    navigate('/');
  };

  return (
    <div>
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
            <strong>{book.title}</strong>: {book.description}
          </li>
        ))}
      </ul>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Books;
