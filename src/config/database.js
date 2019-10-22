module.exports = {
  development: {
    dialect: "postgres",
    host: "127.0.0.1",
    port: "5432",
    username: "henriquefurtadobarros",
    password: "123456",
    database: "empresas",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  }
};
