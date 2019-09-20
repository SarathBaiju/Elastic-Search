using EsDemo.Domain;
using EsDemo.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace EsDemo.Controllers.API
{
    [RoutePrefix("api")]
    public class ElasticApiController : ApiController
    {
        private readonly ElasticSearchLogic _elasticSearchLogic = new ElasticSearchLogic();


        [HttpGet]
        [Route("count")]
        public long GetCount(string searchQuery)
        {
            return _elasticSearchLogic.GetCount(searchQuery);
        }
        [HttpGet]
        [Route("get-all")]
        public List<Editor> GetAll()
        {
            return _elasticSearchLogic.GetAll();
        }
        [HttpPost]
        [Route("get")]
        public List<Editor> GetBySearchQuery(string searchQuery)
        {
            return _elasticSearchLogic.GetDataBySearchQuery(searchQuery);
        }
        
    }
}