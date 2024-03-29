class User < ApplicationRecord

    attr_reader :password
    before_validation :ensure_session_token

    validates :name, :session_token, presence: true
    validates :password_digest, presence: { message: 'Password can\'t be blank'}
    validates :email, presence: true, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true


    has_many :reservations,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: 'Reservation',
        dependent: :destroy

    has_many :reviews,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: 'Review',
        dependent: :destroy


    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user && user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.update!(session_token: User.generate_session_token)
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end
end
