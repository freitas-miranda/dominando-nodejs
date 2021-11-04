import { Op } from "sequelize";
import Sequelize, { Model } from "sequelize";

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
      },
      {
        scopes: {
          active: {
            where: {
              status: "ACTIVE",
            },
          },
          created(inicio, fim) {
            return {
              where: {
                createdAt: {
                  [Op.between]: [inicio, fim],
                },
              },
            };
          },
        },
        hooks: {
          beforeValidate: (customer) => {
            customer.status = "ARCHIVED";
          },
        },
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Contact);
  }
}

export default Customer;
