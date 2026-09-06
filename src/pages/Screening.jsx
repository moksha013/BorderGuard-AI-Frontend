import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import DocumentUpload from '../components/DocumentUpload'
import CameraPanel from '../components/CameraPanel'

function Screening() {
  const { isDark } = useTheme()
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [cameraPhoto, setCameraPhoto] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const navigate = useNavigate()

  const handleFileSelect = (file, previewUrl) => {
    setSelectedFile(file)
    setFilePreview(previewUrl)
  }

  const handleCapture = (photoUrl) => {
    setCameraPhoto(photoUrl)
  }

  const [simulationMode, setSimulationMode] = useState('genuine')

  const handleStartScreening = () => {
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)

      const isSuspicious = simulationMode === 'forged' || (selectedFile && /fake|tamper|forg|reject|fraud/i.test(selectedFile.name))

      const resultPayload = isSuspicious
        ? {
            timestamp: new Date().toISOString(),
            riskScore: 84,
            documentImage: filePreview,
            passengerPhoto: cameraPhoto,
            document: {
              name: 'MICHAEL CHEN',
              passportNumber: 'E9201844',
              nationality: 'Singaporean',
              dateOfBirth: '05 Nov 1982',
              dateOfExpiry: '18 Apr 2028',
              gender: 'Male'
            },
            modules: {
              ocr: {
                status: 'Passed',
                details: 'Machine Readable Zone parsed with 98.8% character confidence.'
              },
              validation: {
                status: 'Failed',
                details: 'ICAO 9303 check digit calculation mismatch on Date of Birth.'
              },
              tampering: {
                status: 'Tampering Flagged',
                details: 'Error Level Analysis (ELA) detected digital splicing and compression artifact around the date field.'
              },
              face: {
                status: 'Match Confirmed',
                score: '91.2%',
                details: 'Facial biometric similarity within acceptable threshold.'
              }
            }
          }
        : {
            timestamp: new Date().toISOString(),
            riskScore: 18,
            documentImage: filePreview,
            passengerPhoto: cameraPhoto,
            document: {
              name: 'ARJUN SHARMA',
              passportNumber: 'Z5839201',
              nationality: 'Indian',
              dateOfBirth: '12 Aug 1994',
              dateOfExpiry: '11 Aug 2034',
              gender: 'Male'
            },
            modules: {
              ocr: {
                status: 'Passed',
                details: 'All required MRZ fields successfully extracted.'
              },
              validation: {
                status: 'Passed',
                details: 'ICAO 9303 checksum digits and expiration dates valid.'
              },
              tampering: {
                status: 'No Issues Detected',
                details: 'Surface compression and text fonts are consistent.'
              },
              face: {
                status: 'Match Confirmed',
                score: '96.2%',
                details: 'High facial similarity between document photo and live feed.'
              }
            }
          }

      navigate('/result', { state: { screeningResult: resultPayload } })
    }, 2000)
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Document Screening
        </h1>
        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Upload the travel document and capture a live passenger image to begin identity screening.
        </p>
      </div>

      {/* Upload and Camera Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DocumentUpload onFileSelect={handleFileSelect} />
        <CameraPanel onCapture={handleCapture} />
      </div>

      {/* Bottom Start & Profile Bar */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border p-4 transition-colors ${
        isDark
          ? 'border-gray-800 bg-gray-900 text-gray-400'
          : 'border-gray-200 bg-white text-gray-600 shadow-sm'
      }`}>
        {/* Test Scenario Selector for SIH demo */}
        <div className="flex items-center gap-3 self-start sm:self-auto text-xs">
          <span className="font-semibold text-gray-400">Demo Scenario:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSimulationMode('genuine')}
              className={`rounded px-2.5 py-1 font-semibold transition border ${
                simulationMode === 'genuine'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : isDark
                  ? 'bg-gray-950 text-gray-400 border-gray-800 hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              ✓ Genuine (Pass)
            </button>
            <button
              type="button"
              onClick={() => setSimulationMode('forged')}
              className={`rounded px-2.5 py-1 font-semibold transition border ${
                simulationMode === 'forged'
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : isDark
                  ? 'bg-gray-950 text-gray-400 border-gray-800 hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              ⚠ Forged Document (Reject)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartScreening}
          disabled={isProcessing}
          className="w-full sm:w-auto rounded-lg bg-yellow-400 hover:bg-yellow-300 px-6 py-2.5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50 transition shadow-sm"
        >
          {isProcessing ? 'Verifying Document...' : 'Start Screening'}
        </button>
      </div>
    </div>
  )
}

export default Screening