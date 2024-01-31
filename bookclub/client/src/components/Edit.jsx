// UpdateBook.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const { BookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    // Fetch the specific book when the component mounts
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/book/${BookId}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error.message);
    }
  };

  const handleUpdateBook = async () => {
    try {
        console.log('Updating book with ID:', BookId);
    console.log('Update data:', book);
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');

      // Include the token in the headers of the axios PUT request
      await axios.put(`http://localhost:5000/api/book/${BookId}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect to the books page after updating
      navigate('/books');
    } catch (error) {
      console.error('Error updating book:', error.message);
      // Handle error (show error message or redirect)
    }
  };

  const handleDeleteBook = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');

      // Include the token in the headers of the axios DELETE request
      await axios.delete(`http://localhost:5000/api/book/${BookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect to the books page after deleting
      navigate('/books');
    } catch (error) {
      console.error('Error deleting book:', error.message);
      // Handle error (show error message or redirect)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={book.description}
          onChange={handleInputChange}
          required
        ></textarea>
      </label>
      <br />
      <button onClick={handleUpdateBook}>Update Book</button>
      <button onClick={handleDeleteBook}>Delete Book</button>
    </div>
  );
};

export default UpdateBook;
