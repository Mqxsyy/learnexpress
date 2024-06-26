"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Post extends Model {
		snippet() {
			return this.body.length > 200
				? this.body.substring(0, 200) + "..."
				: this.body;
		}

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Post.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			body: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
