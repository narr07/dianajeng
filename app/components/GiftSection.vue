<script setup lang="ts">
	import { useToast } from '~/composables/useToast'

	const toast = useToast()

	const copyText = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			toast.show('Copied to clipboard!')
		} catch (err) {
			const textarea = document.createElement('textarea')
			textarea.value = text
			document.body.appendChild(textarea)
			textarea.select()
			document.execCommand('copy')
			document.body.removeChild(textarea)
			toast.show('Copied to clipboard!')
		}
	}
</script>

<template>
	<section
		class="sec full snap"
		id="gift"
	>
		<h2 class="script-title">
			<span class="st-mask">
				<span class="st-inner">Wedding Gift</span>
			</span>
		</h2>
		<p class="sec-sub reveal">
			Your blessing and presence are the greatest gifts of all. For those who have inquired about celebrating with a gift, details are provided below.
		</p>

		<div class="bank-card slide-l">
			<div class="bank-row">
				<div>
					<small>— Bank</small>
					<b>BCA</b>
				</div>
				<button
					class="copy-btn"
					type="button"
					@click="copyText('BCA')"
					aria-label="Copy bank name"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect
							x="9"
							y="9"
							width="11"
							height="11"
							rx="2"
						/>
						<path d="M5 15V6a2 2 0 0 1 2-2h9" />
					</svg>
				</button>
			</div>
			<div class="bank-row">
				<div>
					<small>— Account Number</small>
					<b>1234 5678 90</b>
				</div>
				<button
					class="copy-btn"
					type="button"
					@click="copyText('1234567890')"
					aria-label="Copy account number"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect
							x="9"
							y="9"
							width="11"
							height="11"
							rx="2"
						/>
						<path d="M5 15V6a2 2 0 0 1 2-2h9" />
					</svg>
				</button>
			</div>
			<div class="bank-row">
				<div>
					<small>— Account Name</small>
					<b>Dian Hidayat</b>
				</div>
				<button
					class="copy-btn"
					type="button"
					@click="copyText('Dian Hidayat')"
					aria-label="Copy recipient name"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect
							x="9"
							y="9"
							width="11"
							height="11"
							rx="2"
						/>
						<path d="M5 15V6a2 2 0 0 1 2-2h9" />
					</svg>
				</button>
			</div>
		</div>

		<div class="bank-card slide-r">
			<div class="bank-row">
				<div>
					<small>— Delivery Address</small>
					<b>Physical Gift</b>
				</div>
				<button
					class="copy-btn"
					type="button"
					@click="copyText('Jl. K.H. Abdul Halim No. 45, Majalengka, West Java 45418, Indonesia')"
					aria-label="Copy address"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect
							x="9"
							y="9"
							width="11"
							height="11"
							rx="2"
						/>
						<path d="M5 15V6a2 2 0 0 1 2-2h9" />
					</svg>
				</button>
			</div>
			<p class="addr">Jl. K.H. Abdul Halim No. 45, Majalengka, West Java 45418, Indonesia</p>
		</div>

		<p class="attention reveal">
			<b>Please Note:</b> Kindly verify the bank account name and number prior to transferring.
		</p>
	</section>
</template>

<style scoped>
	.bank-card {
		border: 1px solid var(--line);
		border-radius: 16px;
		padding: 2px 16px;
		margin: clamp(10px, 1.8vh, 18px) auto 0;
		max-width: 400px;
		width: 100%;
		background: rgba(237, 231, 220, 0.03);
		text-align: left;
	}

	.bank-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: clamp(8px, 1.4vh, 12px) 0;
		border-bottom: 1px dashed var(--line);
	}

	.bank-row:last-child {
		border-bottom: 0;
	}

	.bank-row small {
		display: block;
		font: 300 8.5px var(--sans);
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--cream-40);
		margin-bottom: 2px;
	}

	.bank-row b {
		font: 400 clamp(15px, 2.2vh, 17px) var(--serif);
		letter-spacing: 0.05em;
	}

	.copy-btn {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid var(--line);
		background: transparent;
		color: var(--cream-60);
		display: grid;
		place-items: center;
		cursor: pointer;
		flex: none;
		transition: transform 0.25s, color 0.25s, border-color 0.25s;
	}

	.copy-btn:hover {
		color: var(--cream);
		border-color: var(--cream-40);
	}

	.copy-btn:active {
		transform: scale(0.88);
		color: var(--cream);
	}

	.copy-btn svg {
		width: 13px;
		height: 13px;
	}

	.addr {
		padding: clamp(8px, 1.2vh, 12px) 0 6px;
		font: 300 12px / 1.5 var(--sans);
		color: var(--cream-60);
	}

	.attention {
		margin-top: clamp(10px, 1.8vh, 16px);
		font: 300 11px / 1.6 var(--sans);
		color: var(--cream-40);
		text-align: center;
		max-width: 380px;
		margin-inline: auto;
	}

	.attention b {
		color: var(--cream);
		font-weight: 500;
	}
</style>
