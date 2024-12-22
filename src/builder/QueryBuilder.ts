import { Query } from 'mongoose';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // searching
  search(searchable: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $or: searchable.map((field: any) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  // filtering
  filter() {
    const queryObj = { ...this?.query };

    // copy query object
    const excludingImportant = [
      'searchTerm',
      'page',
      'limit',
      'sortBy',
      'sortOrder',
      'fields',
    ];

    excludingImportant.forEach((key) => delete queryObj[key]);
    console.log(queryObj);
    this.modelQuery = this.modelQuery.find();
    return this;
  }

  // pagination
  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this?.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // sort by
  sort() {
    let sortStr;
    if (this.query?.sortBy && this.query?.sortOrder) {
      const sortBy = this.query?.sortBy;
      const sortOrder = this.query?.sortOrder;
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }
    // const result =await paginateQuery.sort(sortStr)
    this.modelQuery = this?.modelQuery.sort(sortStr);
    return this;
  }

  // selected fields
  select() {
    let fields = '-__v';
    if (this?.query?.fields) {
      fields = (this?.query?.fields as string).split(',').join(' ');

      this.modelQuery = this?.modelQuery.select(fields);

      return this;
    }
  }
}
