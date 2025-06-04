// const qs = require('querystring');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // console.log(this.queryString);
    const queryObj = this.queryString;

    // console.log(queryObj);
    // //1.Filtering
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //2.Advanced Filtering(for matching operators)
    let queryStr = JSON.stringify(queryObj);

    // Replace nested property syntax with MongoDB operator format
    queryStr = queryStr.replace(
      /"(\w+)\[(\w+)\]":\s*"(\d+)"/g,
      (match, p1, p2, p3) => `"${p1}": { "$${p2}": ${p3} }`,
    );
    //OLD ONEEE
    //queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // console.log('Query String is : ', queryStr);
    //Exectuting Query
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      // console.log(sortBy);
    } else {
      this.query.sort('-createdAt');
    }
    return this;
  }

  limiting() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v ');
    }
    return this;
  }

  paginating() {
    const limit = this.queryString.limit * 1 || 100;
    const page = this.queryString.page * 1 || 1;
    // console.log(req.query)
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
