import { Op } from "sequelize";
import "./database";

import Customer from "./app/models/Customer";
import Contact from "./app/models/Contact";

class Playground {
  static async play() {
    const customers = await Customer.findAll();
    console.log(JSON.stringify(customers, null, 2));
  }

  static async findId() {
    const customers = await Customer.findAll({
      attributes: ["id", "name"],
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async naoMostrarCampos() {
    const customers = await Customer.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async findByPk() {
    const customers = await Customer.findByPk(3);
    console.log(JSON.stringify(customers, null, 2));
  }

  static async findOne() {
    const customers = await Customer.findOne();
    console.log(JSON.stringify(customers, null, 2));
  }

  static async where() {
    const customers = await Customer.findAll({
      where: {
        status: "ACTIVE",
      },
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async whereIgual() {
    // https://sequelize.org/v5/manual/models-usage.html
    const customers = await Customer.findAll({
      where: {
        status: {
          [Op.eq]: "ACTIVE",
        },
      },
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async whereDiferente() {
    const customers = await Customer.findAll({
      where: {
        status: {
          [Op.ne]: "ACTIVE",
        },
      },
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async whereIn() {
    // https://sequelize.org/v5/manual/models-usage.html
    const customers = await Customer.findAll({
      where: {
        status: {
          [Op.in]: ["ACTIVE", "ARCHIVED"],
        },
        name: {
          [Op.like]: "%MIRANDAS%",
        },
      },
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async whereBetween() {
    const customers = await Customer.findAll({
      where: {
        createdAt: {
          // [Op.between]: [new Date(2021, 10, 1), new Date(2021, 10, 3)],
          [Op.between]: ["2021-11-01", "2021-11-03"],
        },
      },
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async whereOr() {
    // https://sequelize.org/v5/manual/models-usage.html
    const customers = await Customer.findAll({
      where: {
        [Op.or]: {
          status: {
            [Op.in]: ["ARCHIVED"],
          },
          name: {
            [Op.like]: "%MIRANDAS%",
          },
        },
      },
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async join() {
    const customers = await Customer.findAll({
      include: [
        {
          model: Contact,
          where: {
            status: "ACTIVE",
          },
          required: false, // left join
        },
      ],
      where: {
        [Op.or]: {
          status: {
            [Op.in]: ["ARCHIVED"],
          },
          name: {
            [Op.like]: "%MIRANDAS%",
          },
        },
      },
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async order() {
    const customers = await Customer.findAll({
      where: {
        status: {
          [Op.in]: ["ACTIVE", "ARCHIVED"],
        },
      },
      order: [["name", "DESC"], ["createdAt"]],
    });
    console.log(JSON.stringify(customers, null, 2));
  }

  static async limit() {
    const customers = await Customer.findAll({
      where: {
        status: {
          [Op.in]: ["ACTIVE", "ARCHIVED"],
        },
      },
      order: [["name", "DESC"], ["createdAt"]],
      limit: 2,
      offset: 2 * 1 - 2, // limit * page - limit
    });
    console.log(JSON.stringify(customers, null, 2));
  }
}

Playground.limit();
