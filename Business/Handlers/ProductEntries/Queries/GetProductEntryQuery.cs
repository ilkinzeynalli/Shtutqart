using DataAccess.Abstract;
using Entities.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.ProductEntries.Queries
{
    public class GetProductEntryQuery : IRequest<ProductEntryDto>
    {
        public int Id { get; set; }
        public class GetProductEntryQueryHandle : IRequestHandler<GetProductEntryQuery, ProductEntryDto>
        {
            private readonly IStoreTrafficRepository _storeTrafficRepository;
            public GetProductEntryQueryHandle(IStoreTrafficRepository storeTrafficRepository)
            {
                _storeTrafficRepository = storeTrafficRepository;
            }
            public async Task<ProductEntryDto> Handle(GetProductEntryQuery request, CancellationToken cancellationToken)
            {
                
            }
        }
    }
}
