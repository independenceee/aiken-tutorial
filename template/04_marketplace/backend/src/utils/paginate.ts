type Props = {
    data: Array<any>;
    page: number;
    pageSize: number;
};

const paginate = function ({ data, page = 1, pageSize = 8 }: Props) {
    const startIndex: number = (page - 1) * pageSize;
    const totalPage = Math.ceil(data.length / pageSize);
    const endIndex: number = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    return {
        totalPage,
        paginatedData,
    };
};

export default paginate;
