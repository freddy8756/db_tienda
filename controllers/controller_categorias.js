const Sequelize = require('sequelize');
const { UPDATE } = require('sequelize/lib/query-types');
const categorias = require('../models/tbc_categorias').categorias;

module.exports = {
    create(req,res){
        return categorias
        .create({
            nombre: req.params.nombre
        })
        .then(categorias => res.status(200).send(categorias))
        .catch(error => res.status(400).send(error))
    },
    list(_,res){
        return categorias.findAll({})
        .then(categorias => res.status(200).send(categorias))
        .catch(error => res.status(400).send(error))
    },
    find(res,req){
        return categorias.findAll({
            where:{
                nombre: req.params.nombre,
            }
        })
        .then(categorias => res.status(200).send(categorias))
        .catch(error => res.status(400).send(error))
    },
    delete(req,res){
        return categorias.destroy({
            where:{
                id:req.params.id
            }
        })
        .then(() => res.status(200).send({message:"categoria eliminada correctamente"}))
        .catch(error => res.status(400).send(error))
    },
    update(req,res){
        return categorias.update({
            nombre: req.body.nombre
        },
        {
            where:{
                id:req.params.id
            }
        })
        .then(() => res.status(200).send({message:"categoria actualizada correctamente"}))
        .catch(error => res.status(400).send(error))
    }
};