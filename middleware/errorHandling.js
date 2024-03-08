const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    res.status(500).json({ error: 'Internal server error' });
  };
  
  export default errorHandler;
  