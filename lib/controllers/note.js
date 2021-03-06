const Path = require('path');
const Slugify = require('slugify');
const Models = require('../models/');
const Pug = require('pug');

module.exports = {
   create: async (request, reply) => {
     const note = await Models.Note	   
      .create({
         date: new Date(),
	      title: request.payload.noteTitle,
	      slug: Slugify(request.payload.noteTitle, { lower: true }),
	      description: request.payload.noteDescription,
	      content: request.payload.noteContent,
      });
   
         const newNote = Pug.renderFile(
            Path.join(__dirname, '../views/components/note.pug'),
	         { note }
         );  
         
         return newNote;
   },
   read: async (request, h) => {
      const note = await Models.Note.findOne({
         where: { slug: request.params.slug },
      });

      return h.view('note', {
         note,
	      page: `${note.title} - Доска заметок`,
	      description: note.description,
      });
   },
   update: async (request, h) => {
      const values = {
         title: request.payload.noteTitle,
	      description: request.payload.noteDescription,
	      content: request.payload.noteContent,
      };

      const options = {
         where: { slug: request.params.slug },
      };

      await Models.Note.update(values, options);
      const note = await Models.Note.findOne(options);

      const updateNote = Pug.renderFile(
         Path.join(__dirname, '../views/components/note.pug'),
	      { note },
      );
      return updateNote;
   },
   delete: async (request, h) => {
      await Models.Note.destroy({ where: { slug: request.params.slug } });
      return h.redirect('/');
   },
};
