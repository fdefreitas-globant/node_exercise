import { Model } from 'objection';

class Advice extends Model {
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  static get tableName() {
    return 'advices';
  }
}

const insertAdvice = async (props) => {
  return Advice.query().insert(props).returning('*');
};

const readAdvice = async (criteria) => {
  return Advice.query().findOne(criteria);
};

export { Advice as default, insertAdvice, readAdvice };
