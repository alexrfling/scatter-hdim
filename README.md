# scatter-hdim
Interactive scatter plot for R/Shiny

![alt text](https://raw.githubusercontent.com/alexrfling/scatter/master/img/example.png)

## Overview
`scatter` takes a data frame, and optional parameters, and generates an interactive scatter plot of the data. `scatterOutput` and `renderScatter` are the corresponding Shiny wrappers.

## Boilerplate
Requires the package `htmlwidgets`. If not already installed, run:
```r
install.packages('htmlwidgets')
install.packages('/path/to/scatter_0.1.0.tar.gz', repos = NULL, type = 'source')
```
To use, run:
```r
library(htmlwidgets)
library(scatter)
```

## Usage

<a name='scatter' href='#scatter'>#</a> __scatter__(_data_, _width_, _height_, _xKey_, _yKey_, _rKey_, _fKeyCategorical_, _fKeyContinuous_, _categorical_, _loColor_, _mdColor_, _hiColor_, _numColors_, _enableTransitions_, _hardReload_, _newData_)

Renders an interactive scatter plot widget of _data_, with the values in the column named _xKey_ plotted against the values in the column named _yKey_, with the following parameters:

Required:
  * _data_ - a data frame
  * _xKey_ - a column name in _data_. This will be used to determine the x-position of each point in the scatter plot
  * _yKey_ - a column name in _data_. This will be used to determine the y-position of each point in the scatter plot

Optional:
  * _width_ - the width of the widget (default: `NULL`)
  * _height_ - the height of the widget (default: `NULL`)
  * _rKey_ - a column name in _data_. This will be used to determine the size of each point in the scatter plot (default: `NULL`)
  * _fKeyCategorical_ - a column name in _data_. If _categorical_ is `TRUE`, this will be used to determine the color of each point in the scatter plot (default: `NULL`)
  * _fKeyContinuous_ - a column name in _data_. If _categorical_ is not `TRUE`, this will be used to determine the color of each point in the scatter plot (default: `NULL`)
  * _loColor_ - the color to be associated with points that have a low value for _fKeyContinuous_ (default: `#3366cc`)
  * _mdColor_ - the color to be associated with points that have a mid-range value for _fKeyContinuous_ (default: `darkgrey`)
  * _hiColor_ - the color to be associated with points that have a high value for _fKeyContinuous_ (default: `#109618`)
  * _numColors_ - the number of colors in the interpolation of _loColor_, _mdColor_, and _hiColor_ (default: `256`)
  * _categorical_ - if `TRUE`, the color of the points is determined by _fKeyCategorical_, otherwise it is determined by _fKeyContinuous_
  * _enableTransitions_ - if `TRUE`, the widget will render/update with transitions. Otherwise, the widget will render/update without transitions (default: `TRUE`)
  * _hardReload_ - if `TRUE`, completely re-renders the widget; otherwise, smoothly transitions the widget (default: `FALSE`)
  * _newData_ - if `TRUE`, updates all of _data_, _xKey_, _yKey_, _rKey_, _fKeyCategorical_, _fKeyContinuous_, and _enableTransitions_ at once. Otherwise, if the scatter plot has already been rendered once, these parameters are updated one at a time (default: `FALSE`)

<a name='scatterOutput' href='#scatterOutput'>#</a> __scatterOutput__(_outputId_, _width_ = '100%', _height_ = '400px')

Shiny UI wrapper.

<a name='renderScatter' href='#renderScatter'>#</a> __renderScatter__(_expr_, _env_ = parent.frame(), _quoted_ = FALSE)

Shiny server wrapper.

### Example
Data in R:
```r
data = data.frame(matrix(-8:7, ncol = 4))
```
Create an interactive scatter plot of `data`:
```r
scatter(data)
```
See <a href='https://github.com/alexrfling/scatter-hdim/blob/master/app.R'>app.R</a> for more example usage.
