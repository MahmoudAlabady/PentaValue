const pool = require('../pg');

exports.createNote = async (req, res) => {
    const { user_id ,note_title, note_body, note_type_id } = req.params;
  
    try {
      let addNote = await pool.query(`INSERT INTO note(
        user_id, note_title, note_body, note_type_id
    )
    VALUES (
        $1,
        $2,
        $3,
        $4
    ) 
    RETURNING user_id, note_title, note_body, note_type_id`, [user_id, note_title, note_body, note_type_id])
  
      res.json({ addNote });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  exports.getAllNotes = async (req, res) => {
  
    try {
      let getNotes = await pool.query(`SELECT id, user_id, note_title, note_body, note_type_id, creation_datetime
      FROM public.note
      WHERE deleted = false
      ;`).rows
  
      res.json({ getNotes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  router.get('/notes/:id', getNote.rows);

  exports.getNote = async (req, res) => {
    const { user_id } = req.params;
    const { page, limit } = req.pagination;
    const { note_type_id } = req.query; // Assuming note_type_id can be passed as a query parameter

    try {
        let query = `
            SELECT id, user_id, note_title, note_body, note_type_id, creation_datetime
            FROM public.note
            WHERE user_id = $1 
            AND creation_datetime >= current_date - interval '30' day
            AND deleted = false
        `;
        const params = [user_id];

        if (note_type_id) {
            query += ` AND note_type_id = $${params.push(note_type_id)}`;
        }

        query += `
            ORDER BY creation_datetime DESC
            LIMIT $${params.push(limit)} OFFSET $${params.push((page - 1) * limit)}
        `;

        const getNotes = await pool.query(query, params).rows;
  
        res.json({ getNotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteNote = async (req, res) => {
    const { note_id } = req.body;
    try {
      let getNote = await pool.query(`UPDATE public.note
      SET deleted=true
      WHERE id=$1;`, [note_id]).rows
  
      res.json({ getNote});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
