﻿using EsDemo.Connector;
using EsDemo.Models;
using System.Collections.Generic;
using System.Linq;

namespace EsDemo.Domain
{
    public class ElasticSearchLogic
    {
        private readonly EsConnector _esConnector = new EsConnector();
        public long GetCount()
        {
            return _esConnector.EsClient.Count<Editor>(s => s.Type("first").Query(qs => qs.MatchAll())).Count;
        }
        public List<Editor> GetDatas(long take)
        {
            var data = _esConnector.EsClient.Search<Editor>(req => req.Type("first").Take((int)take).Query(query => query.MatchAll()));
            var response = data.Hits.Select(s => s.Source).ToList();
            return response;
        }
        public long GetCount(string searchQuery)
        {
            var count = _esConnector.EsClient.Count<Editor>(s => s.Type("first").Query(qr => qr.Match(e => e.Field(ed=> ed.name).Query(searchQuery))));
            return count.Count;
        }
        public List<Editor> Get(string searchQuery)
        {
            var data = _esConnector.EsClient.Search<Editor>(s => s.Type("first").Query(qr => qr.Match(e => e.Field(ed => ed.name).Query(searchQuery))));
            List<Editor> response = data.Hits.Select(s => s.Source).ToList();
            return response;
        }
        public List<Editor> GetAll()
        {
            long count = this.GetCount();
            if (count > 0)
                return this.GetDatas(count);
            else return null;
        }
    }
   
}