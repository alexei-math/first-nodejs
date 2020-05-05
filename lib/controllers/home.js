const Models = require('../models/');

module.exports = async (request, h) => {
   const notes = await Models.Note.findAll({
      order: [['date', 'DESC']],
   });

   return h.view('home', {
      data: { notes },
      page: 'Домашняя страница - Доска заметок',
      description: 'Добро пожаловать на мою Доску заметок',
   });
};
