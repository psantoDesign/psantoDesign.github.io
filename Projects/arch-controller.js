PaulSantoroWebsite.controller("arch-controller", 
	["$scope", 
	function ArchController($scope) {

		// Initializes the page.
		function initialize() {

			// Enter the images in the order you want to view them.
			let projectImages = [
				"../Resources/StoneArchImgs/StoneArch3DAsset_img1.png",
				"../Resources/StoneArchImgs/StoneArch3DAsset_img2.png",
				"../Resources/StoneArchImgs/StoneArch3DAsset_img3.png",
				"../Resources/StoneArchImgs/StoneArch3DAsset_img4.png"
			];

			// Make it so that the images can be viewed.  Don't modify this part of the code.
			$scope.projectImageView = [];

			// TODO constant image carousel height?
			for (let i = 0; i < projectImages.length; i++) {
				$scope.projectImageView.push({
					alt: "Slide " + i,
					carouselIndicatorClass: i === 0 ? "active" : "",
					carouselInnerClass: i === 0 ? "carousel-item active" : "carousel-item",
					id: "carouselItem" + i,
					index: i,
					isVideo: isVideo(projectImages[i]),
					src: projectImages[i]
				});
			}

			console.log($scope.projectImageView);
		}

		function isVideo(fileName) {
			if (fileName.endsWith(".mp4"))
				return true;
			else
				return false;
		}

		function onCarouselItemChanged(lastItemIndex) {
			let projectImage = $scope.projectImageView[lastItemIndex];

			if (projectImage.isVideo) {
				// Stop the video.
				if (!projectImage.element) {
					projectImage.element = $("#" + projectImage.id)[0];
				}

				projectImage.element.pause();
				projectImage.element.currentTime = 0;
			}
		};
	
		// Initialize the page.  This should only be done once all other functions have been declared.
		initialize();

		$("#carouselProjectImages").bind("slide.bs.carousel", function (e) {
			//console.log("Slide Event Args == ", e);
			onCarouselItemChanged(e.from);
		});
}]);