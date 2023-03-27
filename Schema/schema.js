const graphql = require("graphql")

const a = require('lodash')

const data = require("../Models/books")
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLID, GraphQLNonNull } = graphql


const Booktype = new GraphQLObjectType({
   name: "form",
   fields: () => ({
      id: { type: GraphQLString },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      dob: { type: GraphQLString },
      email: { type: GraphQLString },
   })

})

const RootQuery = new GraphQLObjectType({
   name: "Rootquery",
   fields: {
      book: {
         type: new GraphQLList(Booktype),
         args: { id: { type: GraphQLString } },
         resolve: async (parent, args) => {
            const datas = await data.findAll();
            console.log(datas);
            return datas;

         }

      }
   }
})


const Mutations = new GraphQLObjectType({
   name: "Mutation",
   fields: {
      addbook: {
         type: Booktype,
         args: {
             id:{type:GraphQLString},
            firstname: { type: GraphQLString },
            lastname: { type: GraphQLString },
            dob: { type: GraphQLString },
            email: { type: GraphQLString },
         },
         resolve: async (parent, args) => {
            const up = await data.create(args);
            return up
         }
      },
      updateuser: {
         type: Booktype,
         args: {
            id: { type: GraphQLString },
            firstname: { type: GraphQLString },
            lastname: { type: GraphQLString },
            dob: { type: GraphQLString },
            email: { type: GraphQLString },
         },
         resolve: async (parent, args) => {
            const upd = await data.update(args, {
               where: {
                  id: args.id
               }

            });
            return true
         }
      },
      deleteruser: {
         type: Booktype,
         args: {
            id: { type: GraphQLString },
         },
         resolve: async (parent, args) => {
            let del = await data.destroy({
               where: {
                  id: args.id

               },

            });
            console.log("sdfghjkewrty")
            return {
               id: args.id
            }
         }
      },

   }

})
module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutations,

})

