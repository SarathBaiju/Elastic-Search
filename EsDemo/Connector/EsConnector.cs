using Elasticsearch.Net;
using Nest;
using System;

namespace EsDemo.Connector
{
    public class EsConnector
    {
        public ElasticClient EsClient
        {
            get
            {
                var nodes = new Uri[]
                {
                    new Uri("http://localhost:9200")
                };
                var connectionPool = new StaticConnectionPool(nodes);
                var connectionSettings = new ConnectionSettings(connectionPool);
                connectionSettings.DefaultIndex("deo");
                var elasticClient = new ElasticClient(connectionSettings);
                return elasticClient;
            }

        }
    }
}