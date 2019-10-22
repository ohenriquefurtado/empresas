const { Company } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  create: async (req, res) => {
    try {
      const { company_name, company_type } = req.body

      const company = await Company.create({
        company_name,
        company_type,
      })
      return res.json(company)
    } catch (e) {
      console.log(e)
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params

      await Company.destroy({ where: { id } })
      return res.json({})
    } catch (e) {
      console.log(e)
    }
  },

  getAll: async (req, res) => {
    let { company_name, company_type } = req.query
    if (company_type === undefined && company_name === undefined) {
      company_name = ''
      company_type = ''
    }
    try {
      const company = await Company.findAll({
        where: {
          [Op.or]: [
            {
              company_name: {
                [Op.iLike]: `%${company_name}%`,
              },
            },
            {
              company_type: {
                [Op.iLike]: `%${company_type}%`,
              },
            },
          ],
        },
      })
      return res.json(company)
    } catch (e) {
      console.log(e)
    }
  },

  get: async (req, res) => {
    try {
      const company = await Company.findOne({ where: { id: req.params.id } })

      if (company) return res.json(company)
      else return res.json({ error: 'Não encontrado!' })
    } catch (e) {
      console.log(e)
    }
  },
  update: async (req, res) => {
    try {
      const company_id = req.params.id
      const { company_name, company_type } = req.body
      Company.update(
        {
          company_name: company_name,
          company_type: company_type,
        },
        {
          where: {
            id: company_id,
          },
        }
      )
      return res.json({ success: 'Atualizado com sucesso' })
    } catch (e) {
      console.log(e)
    }
  },

  // getName: async (req, res) => {
  //   try {
  //     const company = await Company.findOne({
  //       where: { str.search(company_name) },
  //     })

  //     if (company) return res.json(company)
  //     else return res.json({ error: 'Não encontrado!' })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // },
}
