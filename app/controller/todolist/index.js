const Todolist = require('../../models/todolist');
const config = require('../../config/config');

// Méthode pour créer un nouvel article
exports.create = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est connecté
    if (!req.user) {
      return res.status(401).json({ message: 'Vous devez être connecté pour créer une Todolist.' });
  }
    const { name, content } = req.body
    const userId = req.user.id;
        const todolist = await Todolist.create({
            name,
            content,
            userId
        })
        if (!todolist.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', todolist: todolist.dataValues})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
};


// Méthode pour mettre à jour un article
exports.update = async (req, res) => {
    try {
      // Vérifier si l'utilisateur est connecté
        if (!req.user) {
            return res.status(401).json({ message: 'Vous devez être connecté pour mettre à jour un todolist.' });
        }
        const todolistId = req.params.id;
        const { name, content } = req.body;
        const todolist = await Todolist.findByPk(todolistId);
        if (!todolist) {
            return res.status(404).json({ message: 'Todolist non trouvé.' });
        }
        // Vérifier si l'utilisateur est l'auteur de la todolist
        if (todolist.userId !== req.user.id) {
            return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à mettre à jour cet todolist.' });
        }
        todolist.name = name;
        todolist.content = content;
        await todolist.save();
        res.json({ message: 'Todolist mis à jour avec succès.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
};

// Méthode pour supprimer un article
exports.delete = async (req, res) => {
    try {
      // Vérifier si l'utilisateur est connecté
        if (!req.user) {
            return res.status(401).json({ message: 'Vous devez être connecté pour supprimer un todolist.' });
        }
        const todolistId = req.params.id;
        const todolist = await Todolist.findByPk(todolistId);
        if (!todolist) {
            return res.status(404).json({ message: 'Todolist non trouvé.' });
        }
        // Vérifier si l'utilisateur est l'auteur de la todolist
        if (todolist.userId !== req.user.id) {
            return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet todolist.' });
        }
        await todolist.destroy();
        res.json({ message: 'Todolist supprimé avec succès.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
};