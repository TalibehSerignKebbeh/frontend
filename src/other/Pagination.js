import React from 'react';

// the component that displays the pagination controls
function Pagination({ totalPages, currentPage, handlePageChange }) {
  // generate an array of page numbers
  const pages = Array.from(Array(totalPages).keys()).map(i => i + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
            <button className="page-link" onClick={() => handlePageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// the component that displays a list of items with pagination
function ItemList({ itemsPerPage, items }) {
  // state for the current page and the items to display on that page
  const [currentPage, setCurrentPage] = React.useState(1);
  const [displayedItems, setDisplayedItems] = React.useState(items.slice(0, itemsPerPage));

  // handle changing the current page
  function handlePageChange(page) {
    setCurrentPage(page);
    setDisplayedItems(items.slice((page - 1) * itemsPerPage, page * itemsPerPage));
  }

  return (
    <div>
      {displayedItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <Pagination
        totalPages={Math.ceil(items.length / itemsPerPage)}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />

        {/* <TableContainer component={Paper}
                        sx={{
                            // mt: 3,
                            mb: 4,
                            width: {xl: '60%',lg:"75%", md: '78%', sm: "85%", xs: '100%' }, px: 2, py: 4,
                            textAlign: 'center', mx: {md:'14px', sm:'3px'},
                            boxShadow: '2px 3px 10px rgba(0 0 0 0.2)'
                        }}>
                        <Table sx={{ w: 'auto', mx: 'auto' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell >Qty</TableCell>
                                    <TableCell >Price(GMD)</TableCell>
                                    <TableCell >Total(GMD)</TableCell>
                                    <TableCell>Seller</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Action</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {sales?.map((sale, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{sale?.product}</TableCell>
                                        <TableCell align='center'>{sale?.quantity}</TableCell>
                                        <TableCell align='center'>{sale?.price}</TableCell>
                                        <TableCell align='center'>{sale?.price * sale?.quantity}</TableCell>
                                        <TableCell align='left'>
                                            {sale?.seller?.firstName} {sale?.seller?.lastName}
                                        </TableCell>
                                        <TableCell align='left'
                                        sx={{fontSize: '12px', fontWeight: '500'}}>
                                            { displayDate(sale?.saleDate)}
                                        </TableCell>
                                        <TableCell>
                                            <Button size='small'
                                                onClick={() => handleInitializedDelete(sale)}
                                                variant='contained' color='warning'
                                            sx={{fontSize:'12px'}}>
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> */}
    </div>
  );
}
