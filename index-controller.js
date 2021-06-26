// Define the "index-controller" controller on the "PaulSantoroWebsite" module
PaulSantoroWebsite.controller("index-controller", 
	["$scope", "$window",
	function IndexController($scope, $window) {

	$scope.projectImageView = [];
	$scope.isTwoColumns = false;
	$scope.isImageCarouselOpen = false;
	$scope.windowWidth = 0;

	// Initializes the page.
	function initialize() {
		
		// Modify this object to modify the home page contents.
		$scope.projects = [
			{
				title: "Stone Arch Unity Asset",
				imageAltText: "Stone Arch Unity Asset",
				imageSource: "Projects/StoneArchUnityAsset/stone_arch_unity_asset_thumbnail.png.gif",
				description: "This is a simple, 3D, low-poly asset I created to be used in the Unity game engine. I created 4 levels of detail, ranging from 1k triangles to 268 triangles. This project was created using Blender 2.93, Substance Painter 2021, Adobe Photoshop, and Unity.",
				page: "Projects/stone.html",
				imagesInCarousel: [
					{
						source: "Projects/StoneArchUnityAsset/stone_arch_unity_asset_img1.png",
						altText: "Stone Arch Image 1",
						isVideo: false
					},
					{
						source: "Projects/StoneArchUnityAsset/stone_arch_unity_asset_img2.png",
						altText: "Stone Arch Image 2",
						isVideo: false
					},
					{
						source: "Projects/StoneArchUnityAsset/stone_arch_unity_asset_img3.png",
						altText: "Stone Arch Image 3",
						isVideo: false
					}
				]
			},
			{
				title: "Cartoon Robot Animation",
				imageAltText: "Cartoon Robot Animation",
				imageSource: "Projects/CartoonRobotAnimation/cartoon_robot_animation_walking_gif_thumbnail.gif",
				description: "A fun, stylized rendition of a happy little robot just enjoying itself. I used a \"how to dance\" video as a visual reference to create the dancing animation. The walking animation was inspired by the giant grin I made for the robot. I created this project using Blender 2.92, and the videos were rendered using Blender's Eevee render engine.",
				page: "Projects/robot.html",
				imagesInCarousel: [
					{
						source: "Projects/CartoonRobotAnimation/DancingAnimation.mp4",
						altText: "Dancing Animation",
						isVideo: true
					},
					{
						source: "Projects/CartoonRobotAnimation/WalkingAnimation.mp4",
						altText: "Walking Animation",
						isVideo: true
					}
				]
			},
			{
				title: "Stylized Forge Render",
				imageAltText: "Stylized Forge Render",
				imageSource: "Projects/StylizedForgeRender/stylized_forge_thumbnail.png",
				description: "Inspired by all the fantasy/medieval games I've played in the past, I decided to build my own rendition of a blacksmith's forge. I used photos of old historic blacksmith forges as references when creating this project. To improve render times, I optimized the models of the stones and the coal. I created the forge using Blender 2.93 and Substance Painter 2021, and the images were rendered using Blender's Cycles render engine.",
				page: "Projects/arch.html",
				imagesInCarousel: [
					{
						source: "Projects/StylizedForgeRender/stylized_forge_img1.png",
						altText: "Stylized Forge Image 1",
						isVideo: false
					},
					{
						source: "Projects/StylizedForgeRender/stylized_forge_img2.png",
						altText: "Stylized Forge Image 2",
						isVideo: false
					}
				]
			}
		];

		// Initialize the thumbnail images from the carousel images (max 3)
		for (let i = 0; i < $scope.projects.length; i++) {
			$scope.projects[i].firstThreeImagesInCarousel = [];
			for (let j = 0; j < Math.min($scope.projects[i].imagesInCarousel.length, 3); j++) {
				$scope.projects[i].firstThreeImagesInCarousel.push($scope.projects[i].imagesInCarousel[j]);
            }
        }
		
		// Reverse so that the newest element appears first.
		$scope.projects.reverse();
		
		// Threshold for project column reorganization.
		$scope.oneColumnMaxWidth = 940;
		
		$scope.onWindowResize();
	}

	function isVideo(fileName) {
		if (fileName.endsWith(".mp4"))
			return true;
		else
			return false;
	}

	function onCarouselItemChanged(lastItemIndex) {
		let projectImage = $scope.projectImageView[lastItemIndex];
		// console.log("Active Image Index == ", lastItemIndex);

		if (projectImage.isVideo) {
			// Stop the video.
			if (!projectImage.element) {
				projectImage.element = $("#" + projectImage.id)[0];
			}

			projectImage.element.pause();
			projectImage.element.currentTime = 0;
		}
	}

	function setColumnView(targetColumns) {
		if (targetColumns === 1) {
			setOneColumnView();
		} else if (targetColumns === 2) {
			setTwoColumnView();
		}
    }

	// Sets the page view to show one column.  The project images are on the top and the description / images are on the bottom.
	function setOneColumnView() {
		console.log("Set one column view called");
		$scope.isTwoColumns = false;
	}
	
	// Sets the page view to show two columns, where the left column has the project thumbnail and the right column has the project info.
	function setTwoColumnView() {
		console.log("Set two column view called");
		$scope.isTwoColumns = true;
	}

	$scope.closeImageCarousel = function () {
		$scope.isImageCarouselOpen = false;
	};

	// Initialize the carousel.
	$scope.onClickProjectImage = function (project, imageIndex) {
		console.log("Called 'onClickProjectImage'");

		// Make it so that the images can be viewed.  Don't modify this part of the code.
		$scope.projectImageView = [];

		for (let i = 0; i < project.imagesInCarousel.length; i++) {
			$scope.projectImageView.push({
				alt: "Slide " + i,
				carouselIndicatorClass: i === imageIndex ? "active" : "",
				carouselInnerClass: i === imageIndex ? "carousel-item active" : "carousel-item",
				id: "carouselItem" + i,
				index: i,
				isVideo: isVideo(project.imagesInCarousel[i].source),
				src: project.imagesInCarousel[i].source
			});
		}

		$scope.isImageCarouselOpen = true;
	};

	// Redirect.
	$scope.onClickNavigationButton = function (href) {
		$window.location.href = href;
	};

	// On resizing the window, determines how page data will be displayed.
	$scope.onWindowResize = function () {
		let previousWidth = $scope.windowWidth;
		let newWidth = $window.innerWidth;
		$scope.windowWidth = newWidth;
		
		// One-column view
		if (newWidth <= $scope.oneColumnMaxWidth && (previousWidth === 0 || previousWidth > $scope.oneColumnMaxWidth)) {  // Shrinking the window or initialization
			setColumnView(1);
			return;
		}
		
		// Two-column view
		if ((newWidth > $scope.oneColumnMaxWidth && previousWidth <= $scope.oneColumnMaxWidth && previousWidth !== 0)  // Growing the window
			|| (newWidth > $scope.oneColumnMaxWidth && previousWidth === 0)) {  // Initialization
			setColumnView(2);
			return;
		}
	};
	
	// Calls the onWindowResize function and digests the $scope.  This is necessary
	// to ensure the page is updated correctly when the window is resized manually
	// by the user.
	$scope.onWindowResizeDigest = function () {
		$scope.onWindowResize();
		$scope.$digest();
	};
	
	// Unbind the window resize function from the $window.
	function cleanUp() {
		angular.element($window).off('resize', $scope.onWindowResizeDigest);
	}

	// Bind the window resize function to the $window.
	angular.element($window).on('resize', $scope.onWindowResizeDigest);
	
	// Clean up the page.
	$scope.$on('$destroy', cleanUp);

	// Handle changing the carousel images.
	$("#carouselProjectImages").bind("slide.bs.carousel", function (e) {
		//console.log("Slide Event Args == ", e);
		onCarouselItemChanged(e.from);
	});
	
	// Initialize the page.  This should only be done once all other functions have been declared.
	initialize();
}]);