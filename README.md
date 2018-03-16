# bstrap-react-mobx-admin

Bootstrap components for [react-mobx-admin](https://github.com/vencax/react-mobx-admin)

See yourself an example of [blogpost list table with sorting, pagination, filtering ...](examples/blog/)

## tech details

It is raw ES6 lib, so you need bundler with transpiling (webpack with babel loader).

[react-mobx-admin](https://github.com/vencax/react-mobx-admin) provides mobx stores
for data table-listing-filtering (list) and data manipulating (manip).
See [README](https://github.com/vencax/react-mobx-admin/blob/master/README.md) for details.
[bstrap-react-mobx-admin](https://github.com/vencax/bstrap-react-mobx-admin) provides
bootstrap based components for rendering this data stores
as well as input components for particular atributes manupulation etc.

[Provided example](examples/blog/) shows all possible usecases.

### Try it by yourself

```sh
git clone https://github.com/vencax/bstrap-react-mobx-admin
cd bstrap-react-mobx-admin
npm i
make run
```

The application is now available at [http://localhost:8080](http://localhost:8080).
