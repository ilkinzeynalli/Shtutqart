using AutoMapper;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Performance;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using MediatR;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.ProductEntries.Queries
{
    public class GetProductEntriesQuery: IRequest<IDataResult<List<ProductEntryDto>>>
    {
        public class GetProductEntriesQueryHandler : IRequestHandler<GetProductEntriesQuery, IDataResult<List<ProductEntryDto>>>
        {
            private readonly IStoreTrafficRepository _storeTrafficRepository;
            private readonly IMapper _mapper;
            public GetProductEntriesQueryHandler(IStoreTrafficRepository storeTrafficRepository,IMapper mapper)
            {
                _storeTrafficRepository = storeTrafficRepository;
                _mapper = mapper;
            }

            [SecuredOperation(Priority = 1)]
            [PerformanceAspect(5)]
            [CacheAspect(10)]
            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<List<ProductEntryDto>>> Handle(GetProductEntriesQuery request, CancellationToken cancellationToken)
            {
                var productEntryList = await _storeTrafficRepository.GetListAsync();
                var prductEntryDtoList = productEntryList.Select(item => _mapper.Map<ProductEntryDto>(productEntryList)).ToList();

                return new SuccessDataResult<List<ProductEntryDto>>(prductEntryDtoList);
            }
        }
    }
    
}
