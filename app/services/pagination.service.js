'use strict';

class PaginationService {
    async paginate(items, currentPage, itemsPerPage, totalItems) {
        let totalPages = Math.ceil(totalItems / itemsPerPage);
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = items.slice(start, end);
        return {
            'items': paginatedItems,
            'currentPage': currentPage,
            'totalPages': totalPages,
            'totalItems': totalItems,
            'nextPage': currentPage + 1 <= totalPages ? parseInt(currentPage + 1) : null,
            'previousPage': currentPage - 1 > 0 ? currentPage - 1 : null
        }
    }
}

module.exports = PaginationService;