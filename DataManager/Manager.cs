using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using net_core_angular_app.Models;

namespace net_core_angular_app.DataManager
{
   public class Manager : IDisposable
   {
      // Url string to retrieve best stories from Hacker News API
      private string bestStoriesUrl = "https://hacker-news.firebaseio.com/v0/beststories.json";
      private string storyItemUrl = "https://hacker-news.firebaseio.com/v0/item/{0}.json?print=pretty";

      bool disposed = false;

      public async Task<List<Story>> GetBestStories()
      {
         var stories = new List<Story>();

         using (var client = new HttpClient())
         {

            try
            {

               // This is going to return a list of story ids
               HttpResponseMessage response = await client.GetAsync(bestStoriesUrl);

               if (response.IsSuccessStatusCode)
               {
                  var ids = await response.Content.ReadAsAsync<List<int>>();

                  // If ids length is greater than 1, fetch story items from Hacker News
                  foreach (var id in ids)
                  {
                     var story = await GetStoryObject(id, client);
                     if (story != null)
                     {
                        stories.Add(story);
                     }
                  }
               }

            }
            catch (Exception ex)
            {
               throw new Exception(ex.Message);
            }

            return stories;

         }
      }

      public async Task<Story> GetStoryObject(int storyId, HttpClient client)
      {
         var story = new Story();
         try
         {
            // Format the storyItem Url string to take the story Id
            var formattedUrl = string.Format(storyItemUrl, storyId);
            // Get the story object from Hacker news based on id passed in
            HttpResponseMessage response = await client.GetAsync(formattedUrl);
            if (response.IsSuccessStatusCode)
            {
               story = await response.Content.ReadAsAsync<Story>();
            }
         }
         catch (Exception ex)
         {
            throw new Exception(ex.Message);
         }
         return story;
      }

      public void Dispose()
      {
         Dispose(true);
      }

      protected virtual void Dispose(bool disposing)
      {
         if (disposed)
            return;

         disposed = true;
      }
   }
}
