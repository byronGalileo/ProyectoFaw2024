const connection = require('./mysql');

module.exports = (app) => {
  // Ruta para obtener las tareas de un usuario por ID
  app.get('/tasksO/:userId', (req, res) => {
    const userId = req.params.userId;

    // Consulta para obtener las tareas del usuario específico
    const query = 'SELECT * FROM task WHERE user = ? AND completo = 0';

    connection.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error al obtener las tareas' });
        return;
      }

      res.json(results);
    });
  });

  app.get('/tasksC/:userId', (req, res) => {
    const userId = req.params.userId;

    // Consulta para obtener las tareas del usuario específico
    const query = 'SELECT * FROM task WHERE user = ? AND completo = 1';

    connection.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error al obtener las tareas' });
        return;
      }

      res.json(results);
    });
  });

  app.post('/tasks/create', (req, res) => {
    const { title, description, priority, user } = req.body;
  
    const query = 'INSERT INTO task (title, description, priority, user, completo, fecha) VALUES (?, ?, ?, ?, 0, NOW())';
  
    connection.query(query, [title, description, priority, user], (error, results) => {
      if (error) {
        console.error('Error inserting task:', error);
        res.status(500).json({ error: 1, message: 'Error inserting task' });
        return;
      }
  
      res.status(201).json({ error: 0,message: 'Task created', taskId: results.insertId });
    });
  });

  app.get('/tasks/complete/:id', (req, res) => {
    const taskId = req.params.id;
  
    const query = 'UPDATE task SET completo = 1 WHERE id = ?';
  
    connection.query(query, [taskId], (error, results) => {
      if (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Error updating task' });
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      res.json({ message: 'Task marked as complete' });
    });
  });

  // Ruta para buscar tareas por título
  app.get('/tasks/search/:userId/:title', (req, res) => {
    const { userId, title } = req.params;
    const query = 'SELECT * FROM task WHERE user = ? AND title LIKE ?';
    connection.query(query, [userId, `%${title}%`], (error, results) => {
      if (error) {
        console.error('Error al buscar las tareas:', error);
        res.status(500).json({ error: 'Error al buscar las tareas' });
        return;
      }
      res.json(results);
    });
  });

  // Ruta para obtener las tareas ordenadas alfabéticamente
  app.get('/tasks/sort/:userId/:order', (req, res) => {
    const { userId, order } = req.params;
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC';
    const query = `SELECT * FROM task WHERE user = ? ORDER BY title ${sortOrder}`;
    connection.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error al ordenar las tareas:', error);
        res.status(500).json({ error: 'Error al ordenar las tareas' });
        return;
      }
      res.json(results);
    });
  });

  // Ruta para filtrar tareas por prioridad
  app.get('/tasks/priority/:userId/:priority', (req, res) => {
    const { userId, priority } = req.params;
    let query = 'SELECT * FROM task WHERE user = ?';
    const queryParams = [userId];
    
    if (priority >= 1 && priority <= 3) {
      query += ' AND priority = ?';
      queryParams.push(priority);
    }

    connection.query(query, queryParams, (error, results) => {
      if (error) {
        console.error('Error al filtrar las tareas:', error);
        res.status(500).json({ error: 'Error al filtrar las tareas' });
        return;
      }
      res.json(results);
    });
  });
};
