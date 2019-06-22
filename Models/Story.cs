using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace net_core_angular_app.Models
{
   // This class is based off of the return item type (story) from Hacker News
   public class Story
   {
      public string By { get; set; }
      public string Descendants { get; set; }
      public int Id { get; set; }
      public int Score { get; set; }
      public string Time { get; set; }
      public string Title { get; set; }
      public string Type { get; set; }
      public string Url { get; set; }
   }
}
