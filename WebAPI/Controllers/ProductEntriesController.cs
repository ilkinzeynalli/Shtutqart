using Business.Handlers.ProductEntries.Queries;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductEntriesController : BaseApiController
    {

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductEntryDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new GetProductEntriesQuery());
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [Produces("application/json","text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK,Type = typeof(ProductEntryDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await Mediator.Send(new GetProductEntriesQuery());
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

    }
}
