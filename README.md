# JSCarousel
Pure Java Script Carousel

> Version: 1.0.0<br>
> Author: Rachid HARAKAT<br>
> Author mail: rachidonline@gmail.com<br>

<h4>Simple implementation:</h4>
<pre>
      var MyCarousel = new JSCarousel({
          carousel  : '#carousel_container_id',
          slide     : '.slides_class',
          navButtons: '#navigation_menu_container_id',
          btnIndex  : '#navigation_buttons_container_id',
          btnNext   : '.navigation_button_next_class',
          btnPrev   : '.navigation_button_prevue_class',
          autoPlay : 5,
      });
      
      /* Jump to slide 5 */
      MyCarousel.goTo(5);
</pre>

<h4>MIT License:</h4>
Copyright (c) 2007-2016 RACHID HARAKAT.<br><br>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
<br>
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
<br>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
