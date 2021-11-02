import styles from './genericInputArea.module.scss'

export default function GenericInputArea({ observation, setObservation }) {

  const updateInputValue = (e) => {
    const newObservation = { ...observation }

    newObservation.value = e.target.value

    setObservation(newObservation)
    e.preventDefault();
  }

  return (
    <div className={styles.inpuArea}>
      <textarea
        className={styles.input}
        placeholder="Ex: Remove  onion"
        value={observation.value}
        onChange={updateInputValue}
      />
    </div>
  )
}