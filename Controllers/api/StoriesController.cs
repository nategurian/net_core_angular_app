using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using net_core_angular_app.Models;
using net_core_angular_app.DataManager;

namespace net_core_angular_app.Controllers
{
   [Route("api/[controller]")]
   public class StoriesController : Controller
   {
      // This method is used to fetch current best stories from Hacker News
      [HttpGet("[action]")]
      public async Task<List<Story>> GetBestStories()
      {
         // Initialize Story list object
         List<Story> bestStories = new List<Story>();

         try
         {
            // Using data manager file to handle all the logic
            using (var mgr = new Manager())
            {
               bestStories = await mgr.GetBestStories();
            }

            return bestStories;
         }
         catch
         {
            throw;
         }
      }
   }
}
