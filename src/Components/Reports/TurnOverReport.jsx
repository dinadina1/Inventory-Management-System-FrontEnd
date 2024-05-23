// import required packages
import React, { useState } from 'react';
import axios from 'axios';

const TurnOverReport = () => {
  // State for loading
  const [loading, setLoading] = useState(false);

  // State for error
  const [error, setError] = useState('');

  // State for success message
  const [success, setSuccess] = useState('');


  // Function to handle download
  const handleDownload = async () => {
    try {

      // Clear error and success messages
      setError('');
      setSuccess('');

      // Set loading state
      setLoading(true);

      // API to download stock level report in Excel format
      const response = await axios.get('https://inventorymangement.netlify.app/purchase/turnoverExcel', {
        responseType: 'blob', // Set responseType to 'blob' to receive binary data
      });

      // Create a blob URL for the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Turnover_Report.xlsx'); // Set the filename for the downloaded file
      document.body.appendChild(link);

      // Trigger the click event on the link to start the download
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      setLoading(false);
      setSuccess('Turnover report downloaded successfully!');

    } catch (error) {
      console.error('Error downloading file:', error);
      setLoading(false);
      setError('Failed to download turnover report!');
    }
  };

  return (
    <>
      <div className='container text-center' style={{ minHeight: "89vh" }}>
        <h2>TurnOver Report</h2>
        <p>Download the turnover report in Excel format.</p>
        <p>This report includes all products in the inventory.</p>

        {/* Display download button */}
        <button onClick={handleDownload} className="btn btn-primary" disabled={loading}>
          {loading ? 'Downloading...' : 'Turn Over Report'}
        </button>

        {/* Display success message */}
        {
          success && (
            <div className="alert alert-success mt-3" role="alert">
              {success}
            </div>
          )
        }

        {/* Display error message */}
        {
          error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )
        }

      </div>
    </>
  );
};

export default TurnOverReport;
