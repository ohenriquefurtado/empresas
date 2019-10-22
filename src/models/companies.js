module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    company_name: DataTypes.STRING,
    company_type: DataTypes.STRING,
  })

  return Company
}
