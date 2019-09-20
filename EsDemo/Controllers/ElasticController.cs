using EsDemo.Domain;
using EsDemo.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EsDemo.Controllers
{
    public class ElasticController : Controller
    {
        private readonly ElasticSearchLogic _elasticSearchLogic = new ElasticSearchLogic();
        [HttpGet]
        public ActionResult Index()
        {
            long count = _elasticSearchLogic.GetTotalCount();
            if (count < 1)
            {
                return View("~/Views/Elastic/NotFound.cshtml");
            }
            else
            {
                List<Editor> editors = _elasticSearchLogic.GetDatas(count);
                return View(editors);
            }           
        }
    }

}