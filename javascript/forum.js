/**
 * Javascript features for the SilverStripe forum module. These have been 
 * ported over from the old Prototype system
 * 
 * @package Forum
 */

(function($) {
	$(document).ready(function() {
		/**
		 * Handle the OpenID information Box.
		 * It will open / hide the little popup
		 */
	
		$("#ShowOpenIDdesc").click(function() {
			if($("#OpenIDDescription").hasClass("showing")) {
				$("#OpenIDDescription").hide().removeClass("showing");
			} else {
				$("#OpenIDDescription").show().addClass("showing");
			}
			return false;
		});
	
		$("#HideOpenIDdesc").click(function() {
			$("#OpenIDDescription").hide();
			return false;
		});
	
	
		/**
		 * BBCode Tools
		 * While editing / replying to a post you can get a little popup
		 * with all the BBCode tags
		 */
		$("#BBCodeHint").click(function() {
			if($("#BBTagsHolder").hasClass("showing")) {
				$(this).text("View Formatting Help");
				$("#BBTagsHolder").hide().removeClass("showing");
			} else {
				$(this).text("Hide Formatting Help");
				$("#BBTagsHolder").show().addClass("showing");
			}
			return false;
		});
	
		/** 
		 * MultiFile Uploader called on Reply and Edit Forms
		 */
		$('#Form_PostMessageForm_Attachment').MultiFile(); 
	
		/**
		 * Delete post Link.
		 *
		 * Add a popup to make sure user actually wants to do 
		 * the dirty and remove that wonderful post
		 */
	
		$('.postModifiers a.deletelink').click(function(){
			if($(this).attr('id')== 'firstPost') {
				if(!confirm("Are you sure you wish to delete this thread?\nNote: This will delete ALL posts in this thread.")) return false;
			} else {
				if(!confirm("Are you sure you wish to delete this post?")) return false;
			}
			var id = $(this).attr("rel");
			$.post($(this).attr("href"), function(data) {
				if(data == 1) {
					// was successful
					$("ul#Posts li#post"+id).fadeOut();
				}
			});

			return false;
		});
	
		/**
		 * Mark Post as Spam Link.
		 * It needs to warn the user that the post will be deleted
		 */
		$('.postModifiers a.markAsSpamLink').click(function(){
			if(!confirm("Are you sure you wish to mark this post and user as spam? This will remove all posts and the users account")) return false;
		
			var id = $(this).attr("rel");
			$.post($(this).attr("href"), function(data) {
				setTimeout("location.reload(true);", 0);
			});
		
			return false;
		});
		
		/**
		 * Delete an Attachment via AJAX
		 */
		$('a.deleteAttachment').click(function() {
			if(!confirm("Are you sure you wish to delete this attachment")) return false;
			var id = $(this).attr("rel");
		
			$.post($(this).attr("href"), function(data) {
				$("#CurrentAttachments li.attachment-"+id).fadeOut(); // hide the deleted attachment
			});
		
			return false;
		});
	
		/**
		 * Subscribe / Unsubscribe button
		 */
		$("td.replyButton a.subscribe").click(function() {
			$.post($(this).attr("href"), function(data) {
				if(data == 1) {
					$("td.replyButton a.subscribe").fadeOut().hide();
					$("td.replyButton a.unsubscribe").fadeIn();
				}
			});
			return false;
		});
	
		$("td.replyButton a.unsubscribe").click(function() {
			$.post($(this).attr("href"), function(data) {
				if(data == 1) {
					$("td.replyButton a.unsubscribe").fadeOut().hide();
					$("td.replyButton a.subscribe").fadeIn();
				}
			});
			return false;
		});
	})
})(jQuery);