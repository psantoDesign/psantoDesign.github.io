PaulSantoroWebsite.controller("material-creation-gallery-controller", 
	["$scope", 
	function MaterialCreationGalleryController($scope) {

		// Initializes the page.
		function initialize() {

			// Enter the images in the order you want to view them.
			let workflowImages = [
				"../Resources/MaterialCreationImgs/materialcreation_tiles_img.png",
				"../Resources/MaterialCreationImgs/materialcreation_stone_arch_img.png",
				"../Resources/MaterialCreationImgs/materialcreation_rusty_metal_img.png",
				"../Resources/MaterialCreationImgs/materialcreation_stylized_pillar_img.png",
				"../Resources/MaterialCreationImgs/materialcreation_retro_textures_img.png",
				"../Resources/MaterialCreationImgs/materialcreation_concrete_img.png"
			];

			// Make it so that the images can be viewed.  Don't modify this part of the code.
			$scope.workflowImageView = [];

			// TODO constant image carousel height?
			for (let i = 0; i < workflowImages.length; i++) {
				$scope.workflowImageView.push({
					alt: "Slide " + i,
					carouselIndicatorClass: i === 0 ? "active" : "",
					carouselInnerClass: i === 0 ? "carousel-item active" : "carousel-item",
					index: i,
					src: workflowImages[i]
				});
			}

			console.log($scope.workflowImageView);
		}
	
		// Initialize the page.  This should only be done once all other functions have been declared.
		initialize();
}]);