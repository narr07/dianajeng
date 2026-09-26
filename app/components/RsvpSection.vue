<script setup lang="ts">
	import { ref } from 'vue'
	import gsap from 'gsap'
	import { useToast } from '~/composables/useToast'

	const toast = useToast()

	const name = ref('')
	const guests = ref('1')
	const attendance = ref('yes')
	const isSubmitted = ref(false)
	const isSubmitting = ref(false)
	const rsvpOkRef = ref<HTMLElement | null>(null)

	const handleSubmit = async () => {
		if (!name.value.trim()) return

		isSubmitting.value = true
		try {
			await $fetch('/api/rsvp', {
				method: 'POST',
				body: {
					name: name.value.trim(),
					guests: guests.value,
					attendance: attendance.value
				}
			})

			isSubmitted.value = true
			if (rsvpOkRef.value) {
				rsvpOkRef.value.style.display = 'block'
				gsap.fromTo(
					rsvpOkRef.value,
					{ opacity: 0, y: 8 },
					{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
				)
			}
			toast.show('RSVP submitted — see you there!')
		} catch (e) {
			toast.show('Failed to submit RSVP. Please try again.')
		} finally {
			isSubmitting.value = false
		}
	}
</script>

<template>
	<section
		class="sec full snap"
		id="rsvp"
	>
		<h2 class="script-title">
			<span class="st-mask">
				<span class="st-inner">Rsvp</span>
			</span>
		</h2>
		<p class="sec-sub reveal">
			We would be honored to have you celebrate this momentous day with us.
		</p>
		<form
			class="slide-l"
			@submit.prevent="handleSubmit"
		>
			<div class="field">
				<span class="f-label">Full Name</span>
				<input
					v-model="name"
					type="text"
					placeholder="Your full name"
					required
				/>
			</div>
			<div class="field">
				<span class="f-label">Number of Guests</span>
				<select v-model="guests">
					<option value="1">1 Person</option>
					<option value="2">2 Persons</option>
					<option value="3">3 Persons</option>
					<option value="4">4 Persons</option>
					<option value="5">5 Persons</option>
					<option value="More than 5">More than 5 Persons</option>
				</select>
			</div>
			<div class="field">
				<span class="f-label">Attendance Confirmation</span>
				<label class="radio">
					<input
						type="radio"
						name="attend"
						value="yes"
						v-model="attendance"
					/>
					<span class="dot"></span>
					<span>Joyfully accepts, I will attend</span>
				</label>
				<label class="radio">
					<input
						type="radio"
						name="attend"
						value="no"
						v-model="attendance"
					/>
					<span class="dot"></span>
					<span>Regretfully declines, unable to attend</span>
				</label>
			</div>
			<button
				class="btn btn-solid"
				type="submit"
				:disabled="isSubmitting"
				style="margin-top: 6px"
			>
				{{ isSubmitting ? 'Sending...' : 'Submit' }}
			</button>
			<p
				ref="rsvpOkRef"
				class="form-ok"
				v-show="isSubmitted"
			>
				Thank you! Your response has been received.
			</p>
		</form>
	</section>
</template>

<style scoped>
	form {
		text-align: left;
		margin-top: 24px;
	}
</style>
