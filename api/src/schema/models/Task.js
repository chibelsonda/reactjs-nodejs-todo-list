module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING(255)
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    },  
    {
        timestamps: false
    });

    return Task;
  };
  